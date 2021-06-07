/**
 * @format
 */

 import 'react-native';
 import React from 'react';
 import Home from '../src/home/Home';
 
 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';
 import Favoris from '../src/home/favoris/Favoris';
 
 it('Render Favoris', () => {
   const tree = renderer.create(<Favoris/>).toJSON();
   expect(tree).toMatchSnapshot();
 })