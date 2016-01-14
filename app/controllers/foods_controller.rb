class FoodsController < ApiController
  load_resource

  def index
    @foods = @foods.ransack(q: params[:sort] || 'created_at desc').result.page(params[:page]).per(params[:per])
    render_resources @foods
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
    params.allow_empty_require(:resource).permit(:id, :name, :category, :price, :product_description, :image_product, :composition, :recommendation_for_use,
                                                 :grams, :count, :sale)
  end
end
