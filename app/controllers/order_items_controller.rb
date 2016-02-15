class OrderItemsController < ApiController
  load_resource

  def create
    @order_items = params[:resource][:items].each { |a| OrderItem.create[a] }
    render_resource_data(@order_items)
  end

  def update
    @order = Order.new
    @order_item = @order.order_items.find(params[:id])
    @order_item.update_attributes(order_item_params)
    @order_items = @order.order_items
  end

  private

  def order_item_params
    params.require(:resource).permit(items: [:unit_price, :quantity, :order_status, :subtotal, :total, :product_id])
  end
end

