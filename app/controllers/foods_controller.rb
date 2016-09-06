class FoodsController < ApiController
  load_resource

  def index
    @foods = @foods.joins(:categories).where(categories: { id: params[:category_id] }) unless params[:category_id].blank?
    render_resources @foods.page(params[:page]).per(params[:per])
  end

  def show
    render_resource_data(@food)
  end

  def create
    @food.save
    render_resource_or_errors(@food)
  end

  def update
    @food.update(post_params)
    render_resource_or_errors(@food)
  end

  def destroy
    @food.destroy
    render nothing: true
  end

  def recommended_foods
    @foods = @foods.sample(params[:count].to_f)
    render_resources @foods
  end

  private

  def food_params
    params.allow_empty_require(:resource).permit(:id, :title, :category, :description, :subtitle)
  end
end
