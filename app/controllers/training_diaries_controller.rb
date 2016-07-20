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

  def diary_stats
    training_exercises = @training_diaries.ransack(exercise_eq: params[:exercise] || 0).result
    filtered_weights = filter_weights(training_exercises.includes(:training_diary_exercises))
    stats = {
        dates: training_exercises.pluck(:date).map { |date| Date.parse(date.to_s).to_formatted_s(:iso8601) },
        weights: Array.new(1, filtered_weights),
        max_weight: filtered_weights.max,
        exercises_categories: exercises_names(@training_diaries),
        exercises_count: exercises_count(@training_diaries)
    }
    render json: stats
  end

  def training_diary_params
    params.require(:resource).permit(:exercise, :sets, :date, training_diary_exercises_attributes: [:repetition, :weight])
  end

  private

  def filter_weights(diaries)
    diaries.map do |diary|
      diary.training_diary_exercises.map(&:weight).max
    end
  end

  def exercises_names(exercises_items)
    exercises = []
    exercises_items.exercises.each_key { |exercise| exercises << exercise }
    exercises
  end

  def exercises_count(exercises_items)
    exercises_counts = []
    items = exercises_items.to_a
    exercises_items.exercises.each_key { |exercise| exercises_counts << items.select { |i| i.exercise == exercise}.length }
    exercises_counts
  end
end
