class ChatroomMembershipSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :chatroom_id
end
