class LiqpayCallbacksController < ApiController
  def create
    liqpay_callback = LiqpayCallback.new(liqpay_callback_params)
    liqpay_callback.save
    render nothing: true
  end

  private

  def liqpay_callback_params
    params.permit(:signature, :data)
  end
end
