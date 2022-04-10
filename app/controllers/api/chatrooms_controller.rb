class Api::ChatroomsController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  before_action :chatroom_authorization
  skip_before_action :chatroom_authorization, only: [:index]

  def index
    chatrooms = Chatroom.all
    render json: chatrooms, status: :ok
  end

  def show
    chatroom = Chatroom.find(params[:id])
    render json: chatroom, status: :ok, serializer: ChatroomShowSerializer, include: ['messages', 'messages.user', 'chatroom_memberships', 'members']
  end 

  private

  def render_not_found
    render json: { errors: ["Chatroom does not exist"] }, status: :not_found
  end

  # private

  def is_member?
    Chatroom.find(params[:id]).members.include? current_user
  end

  def chatroom_authorization
    render json: { errors: ["Not authorized"]}, status: :unauthorized unless is_member?
  end

end
