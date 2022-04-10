class Api::ChatroomMembershipsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  before_action :authorize_chatroom_membership, only: [:destroy]


  def create
    chatroom = Chatroom.find(params[:chatroom_id])
    chatroom.chatroom_memberships.create!(user: current_user)
    render json: chatroom, status: :created
  end

  def destroy
    membership.destroy
    chatroom = Chatroom.find(params[:chatroom_id])
    render json: chatroom, status: :ok
  end

  private

  def membership
    @membership ||= ChatroomMembership.find(params[:id])
  end

  def authorize_chatroom_membership
    render json: { errors: ["Not authorized"] }, status: :unauthorized unless membership.user_id == current_user.id
  end

  def render_not_found
    render json: { errors: ['Please select a chatroom from the available choices']}, status: :not_found
  end

end
