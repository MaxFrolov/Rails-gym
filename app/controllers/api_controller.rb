class ApiController < ActionController::API
  acts_as_jwt_authentication_handler

  include CanCan::ControllerAdditions
  include FrontendHelper

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :jwt_authenticate_user

  respond_to :json

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << { default_caregiver_attributes: [:first_name, :last_name, :birthday, :cell_phone, :work_phone, :relation] } << {facebook_friends_ids:[]} << :facebook << :linkedin
  end

  private

  def jwt_not_authenticated
    render nothing: true, status: :unauthorized
  end

  def render_resource_or_errors(resource, options = {})
    if resource.errors.empty?
      render_resource_data(resource, options)
    else
      render_resource_errors(resource)
    end
  end

  def render_resource_data(resource, options = {})
    render options.merge({ json: resource, root: :resource })
  end

  def render_resource_errors(resource)
    render json: { errors: resource.errors }, status: :unprocessable_entity
  end

  def render_resources(resources, options = {})
    total = resources.respond_to?(:total_count) ? resources.total_count : resources.length
    default = { root: :resources, meta: { total: total } }
    result = resources

    render({ json: result }.merge(default).merge(options))
  end

  rescue_from ActionController::ParameterMissing do |exception|
    render json: { errors: exception.message }, status: :bad_request
  end

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render json: { errors: exception.message }, status: :not_found
  end

  rescue_from CanCan::AccessDenied do |exception|
    render json: { errors: exception.message }, status: :forbidden
  end

end
