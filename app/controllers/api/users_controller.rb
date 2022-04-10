class Api::UsersController < ApplicationController
  skip_before_action :authorize, only: [:create]
  before_action :authorize_user_update, only: [:update]
  
  def show
    render json: current_user, status: :ok
  end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def update
    current_user.update!(update_user_params)
    render json: current_user, status: :ok
  end

  def profile
    render json: current_user, status: :ok, serializer: UserProfileSerializer
  end

  private

  def authorize_user_update
    render json: { errors: ["Not authorized"] }, status: :unauthorized unless current_user.id == params[:id].to_i
  end

  def user_params
    params.permit(:username, :password, :password_confirmation, :image_url)
  end

  def update_user_params
    params.permit(:image_url)
  end
end
