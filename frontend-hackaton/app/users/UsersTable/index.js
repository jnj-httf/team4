import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { HAS_BACKEND } from 'configurations';

export default class UsersTable extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func,
    pagination: PropTypes.object,
  };

  static defaultProps = {
    data: [],
  };

  getColumns() {
    return [
      {
        title: 'Latitude',
        dataIndex: 'vlr_latitude',
        key: 'vlr_latitude',
      },
      {
        title: 'Longitude',
        dataIndex: 'vlr_longitude',
        key: 'vlr_longitude',
      },
      {
        title: 'Municipio',
        dataIndex: 'cod_munic',
        key: 'cod_munic',
      },
      {
        title: 'Cod nes',
        dataIndex: 'cod_cnes',
        key: 'cod_cnes',
      },
      {
        title: 'Nome estab',
        dataIndex: 'nom_estab',
        key: 'nom_estab',
      },
      {
        title: 'Endereço',
        dataIndex: 'dsc_endereco',
        key: 'dsc_endereco',
      },
      {
        title: 'Bairro',
        dataIndex: 'dsc_bairro',
        key: 'dsc_bairro',
      },
      {
        title: 'Cidade',
        dataIndex: 'dsc_cidade',
        key: 'dsc_cidade',
      },
      {
        title: 'Telefone',
        dataIndex: 'dsc_telefone',
        key: 'dsc_telefone',
      },
      {
        title: 'Est. Física Amb.',
        dataIndex: 'dsc_estrut_fisic_ambiencia',
        key: 'dsc_estrut_fisic_ambiencia',
      },
      {
        title: 'Adap. Defic. Fisic. Idosos',
        dataIndex: 'dsc_adap_defic_fisic_idosos',
        key: 'dsc_adap_defic_fisic_idosos',
      },
      {
        title: 'Equipamentos',
        dataIndex: 'dsc_equipamentos',
        key: 'dsc_equipamentos',
      },
      {
        title: 'Medicamentos',
        dataIndex: 'dsc_medicamentos',
        key: 'dsc_medicamentos',
      },
      {
        title: 'CEP',
        dataIndex: 'co_cep',
        key: 'co_cep',
      },
    ];
  }

  render() {
    const { onChange, pagination, data } = this.props;
    // let custompagination = {
    //   ...pagination,
    //   total: 1885,
    // };

    // if (HAS_BACKEND) {
    //   custompagination = undefined;
    // }
    return (
      <Table
        columns={this.getColumns()}
        dataSource={data}
        onChange={onChange}
        rowKey="cod_cnes"
        // pagination={custompagination}
      />
    );
  }
}
