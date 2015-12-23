class DietAdvicesController < ApiController
  load_resource

  def index
    @diet_advices = @diet_advices.ransack(q: params[:sort] || 'created_at desc').result.page(params[:page]).per(params[:per])
    render_resources @diet_advices
  end

  def show
    render_resource_data(@diet_advice)
  end

  def create
    @diet_advice.save
    render_resource_or_errors(@diet_advice)
  end

  def update
    @diet_advice.update(post_params)
    render_resource_or_errors(@diet_advice)
  end

  def destroy
    @diet_advice.destroy
    render nothing: true
  end

  private

  def post_params
    params.allow_empty_require(:resource).permit(:image, :header, :short_description, :description, :category)
  end
end
