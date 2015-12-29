class EventsController < ApiController
  load_resource

  def index
    @events = @events.ransack(q: params[:sort] || 'created_at desc').result.page(params[:page]).per(params[:per])
    render_resources @events
  end

  def show
    render_resource_data(@event)
  end

  def create
    @event.save
    render_resource_or_errors(@event)
  end

  def update
    @event.update(post_params)
    render_resource_or_errors(@event)
  end

  def destroy
    @event.destroy
    render nothing: true
  end

  private

  def event_params
    params.allow_empty_require(:resource).permit(:image, :header, :short_description, :description, :start_date, :end_date)
  end
end
