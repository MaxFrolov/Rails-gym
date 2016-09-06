class CategoriesController < ApiController
  load_resource

  def index
    @categories = @categories.order :name
    @categories = @categories.where('LOWER(name) LIKE ?', "%#{params[:term].mb_chars.downcase.to_s}%") if params[:term].present?
    render_resources @categories.where(target_type: params[:target_type].capitalize)
  end
end
