const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
      ]
    const listWithMultipleBlogs = [
        {
            _id:"66aa520caf61d8026c19ab44",
            title:"Testi1",
            author:"tiia",
            url:"http://www.testi.com",
            likes:100,
            __v:0
        },
        {
            _id:"66aa521eaf61d8026c19ab46",
            title:"Testi2",
            author:"maija",
            url:"http://www.testi2.com",
            likes:10,
            __v:0
        },
        {
            _id:"66aa57f237c6919965afe857",
            title:"Testi3",
            author:"maija",
            url:"http://www.maikinblogi.com",
            likes:600,
            __v:0
        },
        {
            _id:"66aa59bac34579e66385b069",
            title:"Testi4",
            author:"petteri",
            url:"http://www.pekunblogi.com",
            likes:6,
            __v:0
        }
    ]
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        assert.strictEqual(result, 0)
    })
  
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })
  
    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithMultipleBlogs)
        assert.strictEqual(result, 716)
    })
  })

  describe('favoriteBlog', () => {
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
      ]
    const listWithMultipleBlogs = [
        {
            _id:"66aa520caf61d8026c19ab44",
            title:"Testi1",
            author:"tiia",
            url:"http://www.testi.com",
            likes:100,
            __v:0
        },
        {
            _id:"66aa521eaf61d8026c19ab46",
            title:"Testi2",
            author:"maija",
            url:"http://www.testi2.com",
            likes:10,
            __v:0
        },
        {
            _id:"66aa57f237c6919965afe857",
            title:"Testi3",
            author:"maija",
            url:"http://www.maikinblogi.com",
            likes:600,
            __v:0
        },
        {
            _id:"66aa59bac34579e66385b069",
            title:"Testi4",
            author:"petteri",
            url:"http://www.pekunblogi.com",
            likes:6,
            __v:0
        }
    ]
    test('of empty list is zero', () => {
        const result = listHelper.favoriteBlog([])
        assert.strictEqual(result, 0)
    })
  
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        assert.strictEqual(result, listWithOneBlog[0])
    })
  
    test('of a bigger list returns biggest value', () => {
        const result = listHelper.favoriteBlog(listWithMultipleBlogs)
        assert.strictEqual(result, listWithMultipleBlogs[2])
    })
  })

  describe('mostBlogs', () => {
    const oneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
      ]
    const multipleBlogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        }  
      ]
    test('of empty list is zero', () => {
        const result = listHelper.mostBlogs([])
        assert.deepStrictEqual(result, { author: '', blogs: 0 })
    })
  
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.mostBlogs(oneBlog)
        const expected = {
            author: "Edsger W. Dijkstra",
            blogs: 1
          }
        assert.deepStrictEqual(result, expected)
    })
  
    test('of a bigger list returns author who had most blogs', () => {
        const result = listHelper.mostBlogs(multipleBlogs)
        const expected = {
            author: "Robert C. Martin",
            blogs: 3
          }
        assert.deepStrictEqual(result, expected)
    })
  })

  describe('mostLikes', () => {
    const blogOne = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
      ]
    const blogList = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        }  
      ]
    test('of empty list is zero', () => {
        const result = listHelper.mostLikes([])
        assert.deepStrictEqual(result, { author: '', blogs: 0 })
    })
  
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.mostLikes(blogOne)
        const expected = {
            author: "Edsger W. Dijkstra",
            likes: 5
          }
        assert.deepStrictEqual(result, expected)
    })
  
    test('of a bigger list returns author who had most likes', () => {
        const result = listHelper.mostLikes(blogList)
        const expected = {
            author: "Edsger W. Dijkstra",
            likes: 17
          }
        assert.deepStrictEqual(result, expected)
    })
  })