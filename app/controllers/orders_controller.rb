class OrdersController < ApiController
  load_resource

  def show
    render_resource_data(@order)
  end
end
