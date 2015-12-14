DatabaseCleaner.strategy = :truncation, { except: %w(public.schema_migrations) }
DatabaseCleaner.clean

User.create({ email: 'venum@gmail.com', password: '123123123', confirmed_at: Time.now,
              first_name: 'Max', last_name: 'Frolov',
              birthday: Faker::Time.between(45.years.ago, 25.years.ago), role: :admin})

12.times do
  User.create({ email: Faker::Internet.email, password: Faker::Internet.password(8), confirmed_at: Time.now,
                first_name: Faker::Name.first_name, last_name: Faker::Name.last_name,
                birthday: Faker::Time.between(45.years.ago, 25.years.ago), role: :member})
  User.find_by(first_name: 'Max').blogs.create ({picture_url: 'blog_picture', header: Faker::Lorem.sentence(3), short_description: Faker::Lorem.sentence(5),
                 news: Faker::Lorem.paragraph(2), news_date: Faker::Time.between(3.month.ago, Time.now, :all) })
end


