class ChatroomSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :bio
end
