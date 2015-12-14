class OauthController < ApiController
  before_action :load_oauth

  def retrieve_data
    render json: {resource: @oauth.get_data}
  end

  def authenticate_user
    provider_id = @oauth.get_data['id']
    user = User.find_by(params[:provider] => provider_id) if provider_id.present?
    if user.present?
      render json: {auth_token: user.jwt_token}
    else
      render nothing: true, status: :unprocessable_entity
    end
  end

  private

  def load_oauth
    @oauth = OAuth.const_get(params[:provider].camelize).new(params)
  end

end
