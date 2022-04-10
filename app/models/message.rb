class Message < ApplicationRecord
  belongs_to :user
  belongs_to :chatroom

  validates :content, presence: true

  def date_created
    created_at.to_formatted_s(:long_ordinal)
  end
  
end
