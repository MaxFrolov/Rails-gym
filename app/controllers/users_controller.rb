class UsersController < ApplicationController
  load_and_authorize_resource
  def show
    render_resource_data(@user)
  end

  def index
    @user = User.all
    render_resources @user
  end

  def update
    @user.update(user_params)
    render_resource_or_errors(@user)
  end

  def destroy
    @user.destroy
  end

private

  def user_params
    params.require(:resource).permit(:first_name, :last_name, :birthday, :email)
  end
end
