"use client";
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { MOCK_PROPERTIES } from '@/lib/constants';
import type { Property } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label }