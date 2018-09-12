import { connect } from 'react-redux'

import ItemDialog from '../components/ItemDialog'
import actions from '../redux/actions'

const mapDispatchToProps = dispatch => ({
  onSubmit: item => dispatch(actions.items.update.request(item))
})

export default connect(null, mapDispatchToProps)(ItemDialog)
