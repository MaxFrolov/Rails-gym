class CategoriesController < ApiController
  load_resource

  def index
    @categories = @categories.order :name
    @categories = @categories.where('LOWER(name) LIKE ?', "%#{params[:term].mb_chars.downcase.to_s}%") if params[:term].present?
    @categories = @categories.joins(:items_categories).target_filter(params[:target_type])
    render_resources @categories.uniq
  end
end
