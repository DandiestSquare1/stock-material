
export default {
  Loaded: 'loaded',
  Error: 'error',

  Creating: 'creating', // when the entity is being created on the server
  Fetching: 'fetching', // when the entity is being loaded from the server
  Deleting: 'deleting', // when the entity has been queued for deletion from the server
  Updating: 'updating' // when the entity is being updated
}
