import {useState } from 'react';
import { Separator } from '../../../ui';
import axios from 'axios';
import { BACKEND_ENDPOINT } from '@/main';
import { Button } from '@/components/ui';


interface Recommendation {
    title: string;
    artist: string;
  }
  
  interface Genre {
    Genre: string;
    explanation: string;
  }

export const InsightsContent = (): JSX.Element => {

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const cleanJSON = (raw: string): string => {
    return raw.replace(/```json|```/g, '').trim();
  };


  const fetchRecommendations = async (userId: string): Promise<Recommendation[]> => {
      try {
        const response = await axios.post(`${BACKEND_ENDPOINT}/fetchRecommendations`, {
          userId,
        });
    
        const data: Recommendation[] = JSON.parse(cleanJSON(response.data.recommendations));
        setRecommendations(data);
        console.log(recommendations);
        return recommendations; 
      } catch (error: any) {
        console.error("Error fetching recommendations:", error.response?.data || error.message);
        throw error;
      }
    };
    
    const fetchGenres = async (userId: string): Promise<Genre[]> => {
      try {
        const response = await axios.post(`${BACKEND_ENDPOINT}/fetchGenres`, {
          userId,
        });
    
        const data: Genre[] = JSON.parse(cleanJSON(response.data.recommendations));
        setGenres(data);
        console.log(genres);
        return genres;
      } catch (error: any) {
        console.error("Error fetching genres:", error.response?.data || error.message);
        throw error;
      }
    };

    return (
      <>
        <div className="flex flex-row items-center justify-start gap-4 px-8">
          <Button onClick={() => fetchRecommendations('1')}>Get Recommendations</Button>
          <Button onClick={() => fetchGenres('1')}>Get Genres</Button>
        </div>
  
        <div className="w-full px-8">
          <Separator className="my-4 rounded-sm" />
        </div>
  
        <div className="flex flex-row justify-center items-start w-full gap-16 px-8">
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
            <ul className="space-y-2">
            {Array.isArray(recommendations) && recommendations.map((rec, idx) => (
              <div key={idx} className="text-left mb-4">
                <p className="font-bold">{rec.title}</p>
                <p className="text-sm text-gray-500">{rec.artist}</p>
              </div>
            ))}
            </ul>
          </div>
  
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-4">Top Genres</h2>
            <ul className="space-y-2">
            {Array.isArray(genres) && genres.map((genre, idx) => (
              <div key={idx} className="text-left mb-4">
                <p className="font-bold">{genre.Genre}</p>
                <p className="text-sm text-gray-500">{genre.explanation}</p>
              </div>
            ))}
            </ul>
          </div>
        </div>
      </>
    );
}