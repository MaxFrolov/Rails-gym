class GalleriesController < ApiController
  load_resource

  def index
    render_resources @galleries
  end

  def show
    render_resource_data @gallery
  end
end
