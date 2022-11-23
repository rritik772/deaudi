export default interface ProfileModal {
  name: string
  totalTracksAdded: number
  description: string
  username: string
}

export const ProfileDefault: ProfileModal = {
  name: '',
  totalTracksAdded: -1,
  description: '',
  username: ''
}
