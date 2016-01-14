class ProductsController < ApiController
  load_resource

  def index
    @products = @products.ransack(s: params[:sort] || 'created_at desc').result.page(params[:page]).per(params[:per])
    render_resources @products
  end

  def show
    render_resource_data(@product)
  end

  def create
    @product.save
    render_resource_or_errors(@product)
  end

  def update
    @product.update(post_params)
    render_resource_or_errors(@product)
  end

  def destroy
    @product.destroy
    render nothing: true
  end

  def recommended_products
    @products = @products.sample(params[:count].to_f)
    render_resources @products
  end

  private

  def product_params
    params.allow_empty_require(:resource).permit(:image, :header, :short_description, :food_description, :category)
  end
end
