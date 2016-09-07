class GalleriesController < ApiController
  load_resource

  def index
    @galleries = @galleries.includes(:likes, :comments)
    render_resources @galleries.page(params[:page]).per(params[:per])
  end

  def show
    render_resource_data @gallery
  end
end
