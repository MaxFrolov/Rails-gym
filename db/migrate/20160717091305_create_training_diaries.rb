class CreateTrainingDiaries < ActiveRecord::Migration
  def change
    create_table :training_diaries do |t|
      t.integer :sets
      t.timestamp :date
      t.references :user, index: true
      t.references :list_of_exercise, index: true
      t.timestamps null: false
    end
  end
end
