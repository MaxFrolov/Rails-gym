DatabaseCleaner.strategy = :truncation, { except: %w(public.schema_migrations) }
DatabaseCleaner.clean

User.create({ email: 'admin@example.com', password: '123123123', confirmed_at: Time.now,
              first_name: 'Max', last_name: 'Frolov',
              birthday: Faker::Time.between(45.years.ago, 25.years.ago), role: :admin,
              avatar: File.open(File.join(Rails.root, 'test', 'fixtures' , 'avatars', "#{rand(1..4)}.png")) })
increm = 0

12.times do
  User.create({ email: Faker::Internet.email, password: Faker::Internet.password(8), confirmed_at: Time.now,
                first_name: Faker::Name.first_name, last_name: Faker::Name.last_name,
                birthday: Faker::Time.between(45.years.ago, 25.years.ago), role: :member,
                avatar: File.open(File.join(Rails.root, 'test', 'fixtures' , 'avatars', "#{rand(1..4)}.png"))})
  User.find_by(first_name: 'Max').posts.create ({picture_url: 'blog_picture', header: Faker::Lorem.sentence(3), short_description: Faker::Lorem.sentence(5),
                 news: Faker::Lorem.paragraph(8), news_date: Faker::Time.between(3.month.ago, Time.now, :all), post_category: rand(0..3)})
  Comment.create({ message: Faker::Lorem.sentence(3), user_id: rand(1..13), post_id: rand(1..13), email: Faker::Internet.email,
                 name: Faker::Name.first_name, comment_date: Faker::Time.between(3.month.ago, Time.now, :all)})
  DietAdvice.create({ category: Faker::Lorem.word, header: Faker::Lorem.sentence(1), short_description: Faker::Lorem.sentence(5),
                   image: File.open(File.join(Rails.root, 'test', 'fixtures' , 'nutrition', "#{increm += 1}.jpg")), description: Faker::Lorem.paragraph(8) })
end


