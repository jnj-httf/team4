from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS, cross_origin
import requests
from flask_mongoengine import MongoEngine, Document
import json
from flask import jsonify, request, make_response, send_from_directory
from datetime import datetime, time, timedelta
import pymongo

app = Flask(__name__)
api = Api(app, prefix="/hackathon/front")
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['MONGODB_SETTINGS'] = {
    'db': 'hackathon',
    'host': 'mongodb://localhost/hackathon'
}
db = MongoEngine(app)

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["hackathon2"]

mycol = mydb["ubs"]

from app import routes


class Record (db.EmbeddedDocument):
    vlr_latitude = db.FloatField()
    vlr_longitude = db.FloatField()
    cod_munic = db.IntField()
    cod_cnes = db.IntField()
    nom_estab = db.StringField()
    dsc_endereco = db.StringField()
    dsc_bairro = db.StringField()
    dsc_cidade = db.StringField()
    dsc_telefone = db.StringField()
    dsc_estrut_fisic_ambiencia = db.StringField()
    dsc_adap_defic_fisic_idosos = db.StringField()
    dsc_equipamentos = db.StringField()
    dsc_medicamentos = db.StringField()
    co_cep = db.StringField()
    page = db.IntField()

class Records (db.Document):
    meta = {'collection': 'records'}
    createdDate = db.DateTimeField()
    record = db.ListField(db.EmbeddedDocumentField(Record))

#api.add_resource(routes.PrivateResource, '/all')
@app.route('/')
@app.route('/index')
def index():
    #newRecord = Records(datetime.now()).save()
    url = 'https://api-ldc-hackathon.herokuapp.com/api/ubs/1'
    response = requests.get(url)
    json_data = json.loads(response.text)

    #records = Records()



    i = 0
    print("Vendo a page atual>>>> ", json_data['_metadata']['page'])


    totalPagesTemp = json_data['_metadata']['page'].split('/')
    totalPages = totalPagesTemp[1]
    mycol.drop()
    mycol.insert(json_data['records'])



    for page in range(2,int(totalPages) + 1):
    #for page in range(1,5):   #Controla paginas de requests dinamicas

        url2 = 'https://api-ldc-hackathon.herokuapp.com/api/ubs/' + str(page)
        response2 = requests.get(url2)
        json_data2 = json.loads(response2.text)
        #metaPage = json_data2['_metadata']['current_page']


        mycol.insert(json_data2['records'])
        print("Estamos na Page::  " , page)






    return 'teste'



'''
 for ubs in json_data2['records']:  FOR Do item RECORD
newrecord = Record (ubs['vlr_latitude'],
                    ubs['vlr_longitude'],
                    ubs['cod_munic'],
                    ubs['cod_cnes'],
                    ubs['nom_estab'],
                    ubs['dsc_endereco'],
                    ubs['dsc_bairro'],
                    ubs['dsc_cidade'],
                    ubs['dsc_telefone'],
                    ubs['dsc_estrut_fisic_ambiencia'],
                    ubs['dsc_adap_defic_fisic_idosos'],
                    ubs['dsc_equipamentos'],
                    ubs['dsc_medicamentos'],
                    ubs['co_cep'],
                    metaPage,
                    )


#Records.objects.filter(id = newRecord.id).update(push__record = newrecord)
#newRecord = Records(datetime.now(), record = newrecord).save()


#print("Variavel newrecord Latitude:::   " , newrecord['vlr_latitude'])




#print("Variavel records.record - latirude:::   " , records.record['vlr_latitude'])

#print("Variavel Records:::   " , records['createdDate'])
#print("Variavel Records:::   " , records['id'])

#for item in records:
#    print('Itens:::  ' , item)
#print ('Item>Record >>>  ' , item[0])
#for n in json_data['records']:
#    i = i + 1
#print (json_data)
#print ("Vendo os records:::   " , json_data['records'] )
#print ('teste  >>> ' ,i)

'''


