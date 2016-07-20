class TrainingDiariesController < ApiController
  load_resource

  def index
    render_resources @training_diaries
  end

  def create
    @training_diary.save
    render_resource_or_errors(@training_diary)
  end

  def update
    @training_diary.update_attributes(training_diary_params)
    render_resource_or_errors(@training_diary)
  end

  def destroy
    @training_diary.destroy
    render nothing: true
  end

  def training_diary_params
    params.require(:resource).permit(:exercise, :sets, :date, training_diary_exercises_attributes: [:repetition, :weight])
  end
end
