class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :date_created
  
  belongs_to :user, serializer: UserSerializer
end