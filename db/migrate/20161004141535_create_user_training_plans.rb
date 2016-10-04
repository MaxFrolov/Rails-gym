class CreateUserTrainingPlans < ActiveRecord::Migration
  def change
    create_table :user_training_plans do |t|
      t.string :first_name
      t.string :last_name
      t.string :phone
      t.string :email
      t.string :number_of_weeks
      t.references :user
      t.timestamps null: false
    end
  end
end
