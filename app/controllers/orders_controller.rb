class OrdersController < ApiController
  load_resource

  def show
    render_resource_data(@order)
  end

  def create
    @order = @order.save
    render_resource_or_errors(@order)
  end

  def order_params
    params.allow_empty_require(:resource).permit(:order_status, :subtotal, :total, :payment_type)
  end
end
