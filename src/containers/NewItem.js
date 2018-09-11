import { connect } from 'react-redux'

import NewItem from '../components/ItemDialog'
import actions from '../redux/actions'

const mapDispatchToProps = dispatch => ({
  onSubmit: newItem => dispatch(actions.items.add.request(newItem))
})

export default connect(null, mapDispatchToProps)(NewItem)
