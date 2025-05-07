"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { productApi } from "@/lib/api"

export default function CategoryNav() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productApi.getCategories();
        if (response.data.data) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error('获取分类失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="container py-4">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/category/${category}`}
            className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors whitespace-nowrap"
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
}
