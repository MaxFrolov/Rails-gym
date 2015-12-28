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

  private

  def food_params
    params.allow_empty_require(:resource).permit(:image, :header, :short_description, :food_description, :category)
  end
end
