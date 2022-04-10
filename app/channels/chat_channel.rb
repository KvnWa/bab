class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from params[:room]
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_stream_from params[:room]
  end

  def receive(payload)
    message = current_user.messages.create(
      content: payload['message']['content'], 
      chatroom_id: payload['message']['chatroom_id']
    )
    ActionCable.server.broadcast("#{params[:room]}", MessageSerializer.new(message).as_json)
  end
end
