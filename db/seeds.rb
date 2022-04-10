# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts 'Seeding...'

Chatroom.create ([
  {
    name: 'Pop',
    image_url: '',
    bio: 'All About Pop Music'
  },
  {
    name: 'Hip-Hop and Rap',
    image_url: '',
    bio: 'All About Hip-Hop'
  },
  {
    name: 'Rock',
    image_url: '',
    bio: 'All About Rock Music'
  },
  {
    name: 'EDM',
    image_url: '',
    bio: 'All About EDM Music'
  },
  {
    name: 'Latin',
    image_url: '',
    bio: 'All About Latin Music'
  },
  {
    name: 'Indie',
    image_url: '',
    bio: 'All About Indie Music'
  },
  {
    name: 'Classical',
    image_url: '',
    bio: 'All About Classical Music'
  },
  {
    name: 'K-Pop',
    image_url: '',
    bio: 'All About K-Pop Music'
  },
  {
    name: 'Country',
    image_url: '',
    bio: 'All About Country Music'
  }
])

first_user = User.create(username: 'harris', password: '1234', password_confirmation: '1234', image_url: 'https://static01.nyt.com/images/2021/09/30/fashion/29melting-face-emoji/29melting-face-emoji-videoSixteenByNineJumbo1600.jpg')
second_user = User.create(username: 'lynden', password: '1234', password_confirmation: '1234', image_url: 'https://static01.nyt.com/images/2021/09/30/fashion/29melting-face-emoji/29melting-face-emoji-videoSixteenByNineJumbo1600.jpg')
third_user = User.create(username: 'francis', password: '1234', password_confirmation: '1234', image_url: 'https://static01.nyt.com/images/2021/09/30/fashion/29melting-face-emoji/29melting-face-emoji-videoSixteenByNineJumbo1600.jpg')

first_chatroom = Chatroom.first
first_chatroom.chatroom_memberships.create(user: first_user)
first_chatroom.chatroom_memberships.create(user: second_user)
first_user.messages.create(content: 'Have you heard the new Jack Harlow Song?', chatroom: first_chatroom)
second_user.messages.create(content: 'Yea it was very disappointing', chatroom: first_chatroom)
first_user.messages.create(content: 'The chorus carries', chatroom: first_chatroom)

second_chatroom = Chatroom.second
second_chatroom.chatroom_memberships.create(user: first_user)
first_user.messages.create(content: 'Fivio album slaps', chatroom: second_chatroom)
first_user.messages.create(content: 'So many good samples', chatroom: second_chatroom)
first_user.messages.create(content: 'Whats my name is my fav', chatroom: second_chatroom)


third_chatroom = Chatroom.third
third_chatroom.chatroom_memberships.create(user: second_user)
second_user.messages.create(content: 'Idk much about rock music', chatroom: third_chatroom)
second_user.messages.create(content: 'random messages', chatroom: third_chatroom)
second_user.messages.create(content: 'something about electric guitars', chatroom: third_chatroom)
puts 'Seeding Complete'