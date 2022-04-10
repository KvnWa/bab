class ChatroomMembership < ApplicationRecord
  belongs_to :chatroom
  belongs_to :user

  scope :current_member, ->(user) { 
    select('chatroom_memberships.id, chatroom_memberships.user_id, chatroom_memberships.chatroom_id')
    .where(user: user)
    .first 
  }

  #validation needs to be tweaked possibly with updating locales file
  validates :user, uniqueness: { 
    scope: :chatroom, 
    message: -> (object, data) do
      "is already a member of #{object.chatroom.name}"
    end
    }
end
