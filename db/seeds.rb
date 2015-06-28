# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# t.integer  "user_id"
# t.float    "level1"
# t.float    "level2"
# t.float    "level3"
# t.float    "total"
# # t.string   "user"
# #
scores = Score.create([
{user_id: 2, level1: 10, level2: 10, level3: 10, total: 30, name: "Tom"},
{user_id: 3, level1: 10, level2: 10, level3: 10, total: 30, name: "Jerry"}
])