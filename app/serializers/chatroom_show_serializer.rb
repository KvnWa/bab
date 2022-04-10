class ChatroomShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :current_member

  has_many :chatroom_memberships
  has_many :members, serializer: MemberSerializer
  has_many :messages

  def current_member
    object.chatroom_memberships.current_member(current_user)
  end

end
