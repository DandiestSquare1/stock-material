import { connect } from 'react-redux'

import StockTable from '../components/StockTable'

const mapStateToProps = state => ({
  items: [
    { id: '001', name: 'Banana', quantity: 4 },
    { id: '002', name: 'Rice', quantity: 228 },
    { id: '003', name: 'Foo', quantity: 77 },
    { id: '004', name: 'Bar', quantity: 39 },
    { id: '005', name: 'Donut', quantity: 78 },
    { id: '006', name: 'Chocolate', quantity: 1 },
    { id: '007', name: 'Foobar', quantity: 3 },
    { id: '008', name: 'Vanilla', quantity: 98 },
    { id: '009', name: 'Steak', quantity: 3434 },
    { id: '010', name: 'Fries', quantity: 34 },
    { id: '028', name: 'Milk Chocolate', quantity: 98 },
    { id: '029', name: 'Ice Tea', quantity: 3434 },
    { id: '020', name: 'Water', quantity: 34 },
  ]
})

export default connect(mapStateToProps)(StockTable)
