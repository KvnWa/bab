class Chatroom < ApplicationRecord
  has_many :chatroom_memberships, dependent: :destroy
  has_many :members, through: :chatroom_memberships, source: :user
  has_many :messages, dependent: :destroy

  validates :name, presence: true, length: { maximum: 26 }
  validates :bio, presence: true
end
