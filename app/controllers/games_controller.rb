class GamesController < ApplicationController
	before_action :authorize
	def level_one
	end

	def level_two
	end

	def save
    if params[:total] != "NaN"
      Score.create({
        :player => params[:player],
        :level1 => params[:level1],
        :level2 => params[:level2],
        :level3 => params[:level3],
        :level4 => params[:level4],
        :total => params[:total]
        })
    end
  end
  
end
