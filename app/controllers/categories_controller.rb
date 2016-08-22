class CategoriesController < ApiController
  load_resource

  def index
    render_resources @categories.where(target_type: params[:target_type].capitalize)
  end
end
