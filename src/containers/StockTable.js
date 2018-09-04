import { connect } from 'react-redux'

import StockTable from '../components/StockTable'

const mapStateToProps = state => ({
  items: [
    { id: '001', name: 'Banana', quantity: 4 },
    { id: '002', name: 'Rice', quantity: 228 },
    { id: '003', name: 'Strawberry', quantity: 12 },
  ]
})

export default connect(mapStateToProps)(StockTable)
