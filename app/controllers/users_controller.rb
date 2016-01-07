class UsersController < ApiController
  load_and_authorize_resource
  def show
    render_resource_data(@user)
  end

  def index
    @users = User.find_by(user_params)
    render_resources(@users, each_serializer: UserSerializer)
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
    params.require(:resource).permit(:first_name, :last_name, :birthday, :email, :avatar, :avatar_data_uri)
  end
end
