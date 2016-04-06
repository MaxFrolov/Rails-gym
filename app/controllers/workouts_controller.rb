class WorkoutsController < ApiController
  load_resource

  def index
    render_resources(@workouts)
  end

  def show
    render_resources(@workouts)
  end
end
